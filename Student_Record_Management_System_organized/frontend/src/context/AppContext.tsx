import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Student = {
  id: string
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
  photo?: string
  admissionDate: string
  attendance: number
  cgpa: number
}

type Notification = {
  id: number
  title: string
  message: string
  time: string
  type: 'info' | 'success' | 'warning'
  read: boolean
}

type AppContextType = {
  // Auth
  isAuthenticated: boolean
  user: { name: string; role: string; avatar: string } | null
  login: (username: string, password: string, remember: boolean) => boolean
  logout: () => void

  // Theme
  dark: boolean
  toggleDark: () => void

  // Students
  students: Student[]
  addStudent: (student: Omit<Student, 'id' | 'admissionDate' | 'attendance' | 'cgpa'>) => void
  deleteStudent: (id: string) => void
  getStudent: (id: string) => Student | undefined

  // Notifications
  notifications: Notification[]
  unreadCount: number
  markAllRead: () => void

  // Toast
  toast: { id: number; message: string; type: 'success' | 'error' | 'info' } | null
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const AppContext = createContext<AppContextType | null>(null)

const seedStudents: Student[] = [
  {
    id: 'HRS2024AI001',
    fullName: 'Aarav Sharma',
    dob: '2003-04-12',
    gender: 'Male',
    email: 'aarav.sharma@hrs.edu.in',
    phone: '+91 98765 43210',
    address: '42, MG Road, Bengaluru, Karnataka 560001',
    department: 'AI & Data Science',
    year: '3rd Year',
    section: 'A',
    bloodGroup: 'O+',
    parentName: 'Rajesh Sharma',
    parentPhone: '+91 98765 43211',
    admissionDate: '2022-08-15',
    attendance: 94,
    cgpa: 9.2,
  },
  {
    id: 'HRS2024CS028',
    fullName: 'Priya Iyer',
    dob: '2003-09-23',
    gender: 'Female',
    email: 'priya.iyer@hrs.edu.in',
    phone: '+91 98432 11508',
    address: '17, Marine Drive, Mumbai, Maharashtra 400020',
    department: 'Computer Science',
    year: '3rd Year',
    section: 'B',
    bloodGroup: 'A+',
    parentName: 'Lakshmi Iyer',
    parentPhone: '+91 98432 11509',
    admissionDate: '2022-08-15',
    attendance: 91,
    cgpa: 9.6,
  },
  {
    id: 'HRS2024AI017',
    fullName: 'Rohan Mehta',
    dob: '2004-01-08',
    gender: 'Male',
    email: 'rohan.mehta@hrs.edu.in',
    phone: '+91 99876 12340',
    address: '88, Connaught Place, New Delhi 110001',
    department: 'AI & Data Science',
    year: '2nd Year',
    section: 'A',
    bloodGroup: 'B+',
    parentName: 'Vikram Mehta',
    parentPhone: '+91 99876 12341',
    admissionDate: '2023-08-12',
    attendance: 88,
    cgpa: 8.7,
  },
  {
    id: 'HRS2024EC042',
    fullName: 'Sneha Reddy',
    dob: '2004-06-19',
    gender: 'Female',
    email: 'sneha.reddy@hrs.edu.in',
    phone: '+91 90087 65432',
    address: '5, Jubilee Hills, Hyderabad, Telangana 500033',
    department: 'Electronics',
    year: '2nd Year',
    section: 'C',
    bloodGroup: 'AB+',
    parentName: 'Suresh Reddy',
    parentPhone: '+91 90087 65433',
    admissionDate: '2023-08-12',
    attendance: 96,
    cgpa: 9.4,
  },
  {
    id: 'HRS2024ME009',
    fullName: 'Arjun Nair',
    dob: '2002-11-30',
    gender: 'Male',
    email: 'arjun.nair@hrs.edu.in',
    phone: '+91 94960 01234',
    address: '23, Marine Drive, Kochi, Kerala 682011',
    department: 'Mechanical',
    year: '4th Year',
    section: 'A',
    bloodGroup: 'O-',
    parentName: 'Hari Nair',
    parentPhone: '+91 94960 01235',
    admissionDate: '2021-08-10',
    attendance: 82,
    cgpa: 8.1,
  },
  {
    id: 'HRS2024AI033',
    fullName: 'Kavya Patel',
    dob: '2003-12-05',
    gender: 'Female',
    email: 'kavya.patel@hrs.edu.in',
    phone: '+91 98795 67812',
    address: '14, Sarkhej, Ahmedabad, Gujarat 380058',
    department: 'AI & Data Science',
    year: '3rd Year',
    section: 'B',
    bloodGroup: 'B-',
    parentName: 'Manish Patel',
    parentPhone: '+91 98795 67813',
    admissionDate: '2022-08-15',
    attendance: 89,
    cgpa: 9.0,
  },
]

const seedNotifications: Notification[] = [
  { id: 1, title: 'New Admission', message: '5 new students admitted to AI & Data Science', time: '2 min ago', type: 'success', read: false },
  { id: 2, title: 'Attendance Alert', message: 'Low attendance detected for 3 students', time: '1 hr ago', type: 'warning', read: false },
  { id: 3, title: 'System Update', message: 'HRS ERP v2.4 deployed successfully', time: '3 hrs ago', type: 'info', read: false },
  { id: 4, title: 'Exam Schedule', message: 'Mid-semester exam timetable published', time: 'Yesterday', type: 'info', read: true },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('hrs_auth') === 'true'
  })
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('hrs_theme') === 'dark'
  })
  const [students, setStudents] = useState<Student[]>(() => {
    const stored = localStorage.getItem('hrs_students')
    return stored ? JSON.parse(stored) : seedStudents
  })
  const [notifications, setNotifications] = useState<Notification[]>(seedNotifications)
  const [toast, setToast] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' } | null>(null)

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('hrs_theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    localStorage.setItem('hrs_students', JSON.stringify(students))
  }, [students])

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now()
    setToast({ id, message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const login = (username: string, password: string, remember: boolean) => {
    if (username && password.length >= 4) {
      setIsAuthenticated(true)
      if (remember) localStorage.setItem('hrs_auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('hrs_auth')
  }

  const addStudent = (student: Omit<Student, 'id' | 'admissionDate' | 'attendance' | 'cgpa'>) => {
    const deptCode = student.department.split(' ')[0].slice(0, 2).toUpperCase()
    const yearCode = student.year.split(' ')[0]
    const existing = students.filter(s => s.department === student.department).length
    const newStudent: Student = {
      ...student,
      id: `HRS${new Date().getFullYear()}${deptCode}${String(existing + 1).padStart(3, '0')}`,
      admissionDate: new Date().toISOString().split('T')[0],
      attendance: 95,
      cgpa: 0,
    }
    setStudents(prev => [newStudent, ...prev])
    showToast(`Student ${newStudent.fullName} added successfully`, 'success')
  }

  const deleteStudent = (id: string) => {
    const student = students.find(s => s.id === id)
    setStudents(prev => prev.filter(s => s.id !== id))
    if (student) showToast(`Record for ${student.fullName} deleted`, 'error')
  }

  const getStudent = (id: string) => students.find(s => s.id === id)

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  const value: AppContextType = {
    isAuthenticated,
    user: { name: 'Dr. Anand Krishnan', role: 'Chief Administrator', avatar: 'AK' },
    login,
    logout,
    dark,
    toggleDark: () => setDark(d => !d),
    students,
    addStudent,
    deleteStudent,
    getStudent,
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    markAllRead,
    toast,
    showToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}