import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  UserPlus,
  Upload,
  CheckCircle2,
  AlertCircle,
  User,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Hash,
  Droplets,
  Users,
  X,
  Save,
  Sparkles,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const departments = [
  'AI & Data Science',
  'Computer Science',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
]

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
const sections = ['A', 'B', 'C', 'D']
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

type FormData = {
  fullName: string
  dob: string
  gender: string
  email: string
  phone: string
  address: string
  department: string
  year: string
  section: string
  bloodGroup: string
  parentName: string
  parentPhone: string
  photo: string
}

const initialForm: FormData = {
  fullName: '',
  dob: '',
  gender: 'Male',
  email: '',
  phone: '',
  address: '',
  department: 'AI & Data Science',
  year: '1st Year',
  section: 'A',
  bloodGroup: 'O+',
  parentName: '',
  parentPhone: '',
  photo: '',
}

const initials = (name: string) => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?'

export default function AddStudent() {
  const { addStudent, showToast } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.fullName.trim() || form.fullName.trim().length < 3) e.fullName = 'Full name must be at least 3 characters'
    if (!form.dob) e.dob = 'Date of birth is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.phone.trim() || !/^[+\d\s-]{10,15}$/.test(form.phone)) e.phone = 'Valid phone number required'
    if (!form.address.trim() || form.address.trim().length < 10) e.address = 'Complete address required'
    if (!form.parentName.trim()) e.parentName = 'Parent name required'
    if (!form.parentPhone.trim() || !/^[+\d\s-]{10,15}$/.test(form.parentPhone)) e.parentPhone = 'Valid parent phone required'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      showToast('Photo must be less than 2MB', 'error')
      return
    }
    const reader = new FileReader()
    reader.onload = () => handleChange('photo', reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      showToast('Please fix the errors in the form', 'error')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      addStudent(form)
      setSuccess(true)
      setSubmitting(false)
      setTimeout(() => navigate('/students'), 1200)
    }, 900)
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSuccess(false)
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto py-20 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6 }}
          className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center pulse-glow"
          style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)' }}
        >
          <CheckCircle2 size={48} color="#fff" />
        </motion.div>
        <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>Student Registered!</h2>
        <p className="mb-1" style={{ color: 'var(--text-soft)' }}>Record created for <strong style={{ color: 'var(--gold-dark)' }}>{form.fullName}</strong></p>
        <p style={{ color: 'var(--text-muted)' }}>Redirecting to student records...</p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="badge-gold inline-flex mb-3">
            <UserPlus size={11} /> New Admission
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Add New <span className="text-gold-gradient">Student</span>
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'var(--text-muted)' }}>
            Register a new student to HRS Institute · All fields are mandatory
          </p>
        </div>
        <button onClick={handleReset} className="btn-outline text-sm inline-flex items-center gap-2">
          <X size={14} /> Reset Form
        </button>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Photo + Basic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="p-6 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <span className="w-1.5 h-6 rounded-full" style={{ background: 'var(--gold)' }} />
            Photo & Personal Details
          </h3>
          <div className="grid lg:grid-cols-[200px_1fr] gap-6 items-start">
            {/* Photo upload */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div
                  className="w-36 h-36 rounded-2xl overflow-hidden flex items-center justify-center font-display text-4xl font-bold"
                  style={{
                    background: form.photo ? `url(${form.photo}) center/cover` : 'linear-gradient(135deg, #D4AF37, #F5D27A)',
                    color: '#0a0a0a',
                    border: '2px dashed var(--border-strong)',
                  }}
                >
                  {!form.photo && initials(form.fullName)}
                </div>
                <label
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D27A)' }}
                >
                  <Upload size={16} color="#0a0a0a" />
                  <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                </label>
              </div>
              <p className="text-[11px] mt-3 text-center" style={{ color: 'var(--text-muted)' }}>
                Click icon to upload<br />JPG, PNG · Max 2MB
              </p>
            </div>

            {/* Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Full Name"
                icon={User}
                value={form.fullName}
                onChange={(v) => handleChange('fullName', v)}
                error={errors.fullName}
                placeholder="e.g., Aarav Sharma"
              />
              <Field
                label="Date of Birth"
                icon={Calendar}
                type="date"
                value={form.dob}
                onChange={(v) => handleChange('dob', v)}
                error={errors.dob}
              />
              <SelectField
                label="Gender"
                icon={Users}
                value={form.gender}
                onChange={(v) => handleChange('gender', v)}
                options={['Male', 'Female', 'Other']}
              />
              <SelectField
                label="Blood Group"
                icon={Droplets}
                value={form.bloodGroup}
                onChange={(v) => handleChange('bloodGroup', v)}
                options={bloodGroups}
              />
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <span className="w-1.5 h-6 rounded-full" style={{ background: 'var(--gold)' }} />
            Contact Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Email Address"
              icon={Mail}
              type="email"
              value={form.email}
              onChange={(v) => handleChange('email', v)}
              error={errors.email}
              placeholder="student@hrs.edu.in"
            />
            <Field
              label="Phone Number"
              icon={Phone}
              type="tel"
              value={form.phone}
              onChange={(v) => handleChange('phone', v)}
              error={errors.phone}
              placeholder="+91 98765 43210"
            />
            <div className="sm:col-span-2">
              <Field
                label="Address"
                icon={MapPin}
                value={form.address}
                onChange={(v) => handleChange('address', v)}
                error={errors.address}
                placeholder="Complete residential address"
                multiline
              />
            </div>
          </div>
        </motion.div>

        {/* Academic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="p-6 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <span className="w-1.5 h-6 rounded-full" style={{ background: 'var(--gold)' }} />
            Academic Details
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SelectField
              label="Department"
              icon={Building2}
              value={form.department}
              onChange={(v) => handleChange('department', v)}
              options={departments}
            />
            <SelectField
              label="Year"
              icon={GraduationCap}
              value={form.year}
              onChange={(v) => handleChange('year', v)}
              options={years}
            />
            <SelectField
              label="Section"
              icon={Hash}
              value={form.section}
              onChange={(v) => handleChange('section', v)}
              options={sections}
            />
            <SelectField
              label="Student ID"
              icon={Sparkles}
              value="Auto-generated"
              onChange={() => {}}
              options={['Auto-generated']}
              disabled
            />
          </div>
        </motion.div>

        {/* Parent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <span className="w-1.5 h-6 rounded-full" style={{ background: 'var(--gold)' }} />
            Parent / Guardian Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Parent / Guardian Name"
              icon={User}
              value={form.parentName}
              onChange={(v) => handleChange('parentName', v)}
              error={errors.parentName}
              placeholder="e.g., Rajesh Sharma"
            />
            <Field
              label="Parent Phone"
              icon={Phone}
              type="tel"
              value={form.parentPhone}
              onChange={(v) => handleChange('parentPhone', v)}
              error={errors.parentPhone}
              placeholder="+91 98765 43210"
            />
          </div>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <p className="text-xs flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <AlertCircle size={13} style={{ color: 'var(--gold-dark)' }} />
            Please verify all details. <strong>Records cannot be edited</strong> after submission — only deletion is allowed.
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="btn-gold inline-flex items-center gap-2"
          >
            {submitting ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Save Student Record
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </div>
  )
}

// Reusable field components
type FieldProps = {
  label: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  value: string
  onChange: (v: string) => void
  error?: string
  placeholder?: string
  type?: string
  multiline?: boolean
}

function Field({ label, icon: Icon, value, onChange, error, placeholder, type = 'text', multiline }: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
        {label} <span style={{ color: '#dc2626' }}>*</span>
      </label>
      <div className="relative">
        <span className={`absolute ${multiline ? 'top-3.5' : 'top-1/2 -translate-y-1/2'} left-3.5 pointer-events-none`} style={{ color: 'var(--text-muted)' }}>
          <Icon size={15} />
        </span>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="input-premium pl-11 resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="input-premium pl-11"
          />
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs mt-1 flex items-center gap-1"
            style={{ color: '#dc2626' }}
          >
            <AlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

type SelectFieldProps = {
  label: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  value: string
  onChange: (v: string) => void
  options: string[]
  disabled?: boolean
}

function SelectField({ label, icon: Icon, value, onChange, options, disabled }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-soft)' }}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }}>
          <Icon size={15} />
        </span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="input-premium pl-11 pr-8 appearance-none cursor-pointer disabled:opacity-50"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  )
}