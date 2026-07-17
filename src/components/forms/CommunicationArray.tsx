/**
 * CommunicationArray — ATUL-1 Contact System
 *
 * A futuristic contact form themed as a deep-space communication array.
 * Instead of "Submit Message" → "Transmit Signal"
 */

'use client';

import React, { useState } from 'react';

export default function CommunicationArray() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    transmission: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', transmission: '' });
      
      // Hide success message after 5s
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="communication-array glass-strong">
      <div className="array-header">
        <h2 className="array-title">Communication Array</h2>
        <p className="array-subtitle">Send a transmission to Commander Atul</p>
      </div>

      {isSubmitted ? (
        <div className="array-success">
          <div className="success-icon" aria-hidden="true">✓</div>
          <h3>Signal Successfully Delivered</h3>
          <p>Your transmission has been received. ATUL-1 will respond shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="array-form">
          <div className="form-group">
            <label htmlFor="comm-name">Operator Name</label>
            <input
              id="comm-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Enter your name..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="comm-email">Communication Channel</label>
            <input
              id="comm-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comm-subject">Transmission Subject</label>
            <input
              id="comm-subject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              placeholder="Subject..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="comm-message">Message Content</label>
            <textarea
              id="comm-message"
              value={formData.transmission}
              onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
              required
              rows={5}
              placeholder="Enter your transmission..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="transmit-btn"
          >
            {isSubmitting ? 'Transmitting...' : 'Transmit Signal'}
          </button>
        </form>
      )}

      <style jsx>{`
        .communication-array {
          padding: 2rem;
          border-radius: var(--radius-xl, 1rem);
          max-width: 600px;
          margin: 0 auto;
        }

        .array-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .array-title {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          color: var(--color-text, #F8FAFC);
          margin-bottom: 0.5rem;
          letter-spacing: 0.1em;
        }

        .array-subtitle {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.875rem;
          color: var(--color-text-muted, #94A3B8);
          margin: 0;
        }

        .array-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-family: var(--font-code, 'JetBrains Mono', monospace);
          font-size: 0.75rem;
          color: var(--color-text-muted, #94A3B8);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        input, textarea {
          padding: 0.75rem 1rem;
          background: var(--glass-bg, rgba(255,255,255,0.08));
          border: 1px solid var(--border-color-light, rgba(255,255,255,0.08));
          border-radius: var(--radius-md, 0.5rem);
          color: var(--color-text, #F8FAFC);
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.938rem;
          transition: all var(--transition-fast, 150ms ease);
          outline: none;
        }

        input:focus, textarea:focus {
          border-color: var(--color-primary, #3B82F6);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        input::placeholder, textarea::placeholder {
          color: var(--color-text-dim, #64748B);
        }

        textarea {
          resize: vertical;
          min-height: 120px;
        }

        .transmit-btn {
          padding: 0.875rem 2rem;
          background: var(--color-primary, #3B82F6);
          color: white;
          border: none;
          border-radius: var(--radius-md, 0.5rem);
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.938rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-normal, 300ms ease);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          align-self: flex-end;
        }

        .transmit-btn:hover:not(:disabled) {
          background: #2563EB;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          transform: translateY(-2px);
        }

        .transmit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .array-success {
          text-align: center;
          padding: 3rem 2rem;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success, #22C55E);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
          border: 2px solid var(--color-success, #22C55E);
        }

        .array-success h3 {
          font-family: var(--font-heading, 'Orbitron', sans-serif);
          font-size: 1.25rem;
          color: var(--color-success, #22C55E);
          margin-bottom: 0.5rem;
        }

        .array-success p {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.875rem;
          color: var(--color-text-muted, #94A3B8);
          margin: 0;
        }

        @media (max-width: 768px) {
          .communication-array {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}