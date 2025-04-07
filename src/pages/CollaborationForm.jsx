import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const collaborationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  age: z.number().min(0).max(150),
  gender: z.enum(['male', 'female', 'other']),
  contactNumber: z.string().min(10, 'Valid contact number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  medicalHistory: z.string(),
  currentSymptoms: z.string(),
  assistanceType: z.enum(['emergency', 'routine', 'specialist']),
  emergencyContact: z.string().optional(),
  emergencyLocation: z.string().optional(),
  preferredDoctor: z.string(),
  hospitalBranch: z.string(),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'critical']),
  assistanceTypeRequested: z.enum(['consultation', 'treatment', 'surgery', 'followup']),
  treatmentPlan: z.string(),
  insuranceProvider: z.string().optional(),
  additionalNotes: z.string().optional(),
});

const CollaborationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collaborationSchema),
  });

  const assistanceType = watch('assistanceType');

  const onSubmit = async (data) => {
    console.log(data);

    // Uncomment to integrate with backend API
    /*
    try {
      const response = await fetch('https://your-api-endpoint.com/collaborations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send request');

      const result = await response.json();
      console.log('Request sent successfully:', result);
    } catch (error) {
      console.error('Error sending request:', error);
    }
    */
  };

  const saveDraft = async (data) => {
    console.log('Saving draft:', data);

    // Uncomment to integrate with draft API
    /*
    try {
      const response = await fetch('https://your-api-endpoint.com/collaborations/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save draft');

      const result = await response.json();
      console.log('Draft saved successfully:', result);
    } catch (error) {
      console.error('Error saving draft:', error);
    }
    */
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Collaboration Request Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Patient Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" {...register('fullName')} className="w-full p-2 border rounded" />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input type="number" {...register('age', { valueAsNumber: true })} className="w-full p-2 border rounded" />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select {...register('gender')} className="w-full p-2 border rounded">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium mb-1">Contact Number</label>
              <input type="tel" {...register('contactNumber')} className="w-full p-2 border rounded" />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" {...register('email')} className="w-full p-2 border rounded" />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea {...register('address')} className="w-full p-2 border rounded" rows={3} />
            </div>

            {/* Medical History */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Medical History</label>
              <textarea {...register('medicalHistory')} className="w-full p-2 border rounded" rows={4} />
            </div>

            {/* Current Symptoms */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Current Symptoms</label>
              <textarea {...register('currentSymptoms')} className="w-full p-2 border rounded" rows={4} />
            </div>

            {/* Assistance Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Assistance Type</label>
              <select {...register('assistanceType')} className="w-full p-2 border rounded">
                <option value="routine">Routine Care</option>
                <option value="specialist">Specialist Consultation</option>
                <option value="emergency">Emergency Care</option>
              </select>
            </div>

            {/* Emergency Fields */}
            {assistanceType === 'emergency' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Contact</label>
                  <input type="text" {...register('emergencyContact')} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Location</label>
                  <input type="text" {...register('emergencyLocation')} className="w-full p-2 border rounded" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Collaboration Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Collaboration Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Doctor/Specialist</label>
              <input type="text" {...register('preferredDoctor')} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hospital Branch</label>
              <input type="text" {...register('hospitalBranch')} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Urgency Level</label>
              <select {...register('urgencyLevel')} className="w-full p-2 border rounded">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Requested Assistance Type</label>
              <select {...register('assistanceTypeRequested')} className="w-full p-2 border rounded">
                <option value="consultation">Consultation</option>
                <option value="treatment">Treatment</option>
                <option value="surgery">Surgery</option>
                <option value="followup">Follow-up</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Expected Treatment Plan</label>
              <textarea {...register('treatmentPlan')} className="w-full p-2 border rounded" rows={4} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Insurance Provider</label>
              <input type="text" {...register('insuranceProvider')} className="w-full p-2 border rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <textarea {...register('additionalNotes')} className="w-full p-2 border rounded" rows={4} />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={handleSubmit(saveDraft)}
            className="px-6 py-2 bg-secondary text-primary rounded hover:bg-opacity-90"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          >
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollaborationForm;
