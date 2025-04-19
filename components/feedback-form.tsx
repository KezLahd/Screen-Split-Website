"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    rating: '',
    improvements: '',
    features: ''
  });

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 10000); // Hide after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.rating || (!formData.improvements && !formData.features)) {
      toast.error('Please fill out all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      // Show success overlay
      setShowSuccess(true);

      // Clear form
      setFormData({
        email: '',
        rating: '',
        improvements: '',
        features: ''
      });
      
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm rounded-lg z-50">
          <div className="text-center space-y-4 p-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-semibold text-foreground">Thank you for your feedback!</h3>
            <p className="text-muted-foreground max-w-md">
              Your input helps us improve Screen Split and make it better for everyone. We truly value your contribution to our development process.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>How would you rate your experience with Screen Split?</Label>
          <RadioGroup
            value={formData.rating}
            onValueChange={(value) => setFormData({ ...formData, rating: value })}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {['Excellent', 'Good', 'Average', 'Poor'].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <RadioGroupItem value={rating} id={rating} />
                <Label htmlFor={rating}>{rating}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="improvements">What could we improve?</Label>
          <Textarea
            id="improvements"
            placeholder="Share your thoughts, suggestions, or report any bugs you've encountered..."
            value={formData.improvements}
            onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
            className="min-h-[100px]"
            required={!formData.features}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">Any features you'd like to see added?</Label>
          <Textarea
            id="features"
            placeholder="Tell us what features would make Screen Split even better for you..."
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            className="min-h-[100px]"
            required={!formData.improvements}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </div>
  );
}
