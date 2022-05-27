export interface Activity {
  id: string
  name: string
  color: string
  integration: string
  spaceId: string
}

export interface Entry {
  id: string
  activityId: string
  saved?: boolean
  duration: {
    startedAt: string
    stoppedAt: string
  }
  note: {
    text: string | null
    tags: {
      id: string
      key: string
      label: string
      scope: string
      spaceId: string
    }[]
    mentions: {
      id: string
      key: string
      label: string
      scope: string
      spaceId: string
    }[]
  }
}

export interface Contact {
  url: string
  organisation_name: string | undefined
  active_projects_count: number
  created_at: string
  updated_at: string
}

export interface ContactProject {
  url: string
  name: string
  contact: string
  contact_name: string
  currency: string
  created_at: string
  updated_at: string
}

export interface Task {
  url: string
  project: string
  name: string
  is_billable: boolean
  status: string
  created_at: string
  updated_at: string
}

export interface SelectType {
  id: number
  value: string
}

export interface Token {
  access_token: string
  token_type: string
  expires_in: string
  refresh_token: string
  refresh_token_expires_in: string
}


export interface Timeslip {
  taskID: string
  projectID: string
  userID: string
  hours: number
  dated_on: Date
  comment: string
}
