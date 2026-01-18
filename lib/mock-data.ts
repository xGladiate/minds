export interface Activity {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: "wellness" | "social" | "learning" | "fitness"
  targetAudience: "beneficiary" | "caregiver" | "volunteer"
  capacity: number
  registered: number
  description: string
  requiresCaregiver?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  nric?: string
  role: "participant" | "caregiver" | "admin"
  caregiverId?: string
  caregiverName?: string
  caregiverPhone?: string
}

export interface Registration {
  id: string
  activityId: string
  userId: string
  userName: string
  status: "pending" | "confirmed" | "declined" | "cancelled"
  caregiverApproval?: "pending" | "approved" | "declined"
  registeredAt: string
  specialRequirements?: string
}

export const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Morning Tai Chi",
    date: "2026-01-20",
    time: "08:00 - 09:00",
    location: "Community Garden",
    category: "fitness",
    targetAudience: "beneficiary",
    capacity: 20,
    registered: 12,
    description: "Gentle morning exercise suitable for all fitness levels",
    requiresCaregiver: false,
  },
  {
    id: "2",
    title: "Art Therapy Workshop",
    date: "2026-01-21",
    time: "14:00 - 16:00",
    location: "Activity Room A",
    category: "wellness",
    targetAudience: "beneficiary",
    capacity: 15,
    registered: 8,
    description: "Express yourself through painting and creative activities",
    requiresCaregiver: true,
  },
  {
    id: "3",
    title: "Digital Skills Class",
    date: "2026-01-22",
    time: "10:00 - 12:00",
    location: "Computer Lab",
    category: "learning",
    targetAudience: "beneficiary",
    capacity: 12,
    registered: 10,
    description: "Learn to use smartphones and basic internet skills",
    requiresCaregiver: false,
  },
  {
    id: "4",
    title: "Social Tea Session",
    date: "2026-01-23",
    time: "15:00 - 17:00",
    location: "Main Hall",
    category: "social",
    targetAudience: "beneficiary",
    capacity: 30,
    registered: 18,
    description: "Meet friends, enjoy tea and snacks together",
    requiresCaregiver: false,
  },
  {
    id: "5",
    title: "Caregiver Support Group",
    date: "2026-01-24",
    time: "19:00 - 21:00",
    location: "Meeting Room B",
    category: "wellness",
    targetAudience: "caregiver",
    capacity: 15,
    registered: 6,
    description: "Share experiences and receive peer support",
    requiresCaregiver: false,
  },
  {
    id: "6",
    title: "Chair Yoga",
    date: "2026-01-25",
    time: "09:00 - 10:00",
    location: "Activity Room A",
    category: "fitness",
    targetAudience: "beneficiary",
    capacity: 20,
    registered: 15,
    description: "Gentle yoga exercises done while seated",
    requiresCaregiver: false,
  },
]

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Mary Tan",
    email: "mary.tan@email.com",
    phone: "+65 9123 4567",
    nric: "S1234567A",
    role: "participant",
    caregiverId: "c1",
    caregiverName: "John Tan",
    caregiverPhone: "+65 9876 5432",
  },
  {
    id: "u2",
    name: "David Lee",
    email: "david.lee@email.com",
    phone: "+65 9234 5678",
    role: "participant",
  },
]

export const mockRegistrations: Registration[] = [
  {
    id: "r1",
    activityId: "1",
    userId: "u1",
    userName: "Mary Tan",
    status: "confirmed",
    caregiverApproval: "approved",
    registeredAt: "2026-01-15T10:30:00",
  },
  {
    id: "r2",
    activityId: "2",
    userId: "u1",
    userName: "Mary Tan",
    status: "pending",
    caregiverApproval: "pending",
    registeredAt: "2026-01-16T14:20:00",
  },
  {
    id: "r3",
    activityId: "3",
    userId: "u2",
    userName: "David Lee",
    status: "confirmed",
    registeredAt: "2026-01-16T09:15:00",
  },
]

export const categoryColors = {
  wellness: "bg-emerald-100 text-emerald-800 border-emerald-200",
  social: "bg-amber-100 text-amber-800 border-amber-200",
  learning: "bg-blue-100 text-blue-800 border-blue-200",
  fitness: "bg-rose-100 text-rose-800 border-rose-200",
}
