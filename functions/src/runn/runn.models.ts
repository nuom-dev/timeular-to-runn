export interface Project {
  id: string,
  name: string,
  archived: boolean,
  references: {
    name: {
      external_id: string,
      direct_url: string
    }
  },
  confirmed: boolean,
  client_name: string,
  client_id: string,
  team_id: string,
  budget: string,
  pricing_model: string,
  rate_card_id: string,
  rate_type: string,
  tags: [
    string
  ]
}

export interface Person {
  id: string,
  name: string,
  archived: boolean,
  references: {
    name: {
      external_id: string,
      direct_url: string
    }
  },
  first_name: string,
  last_name: string,
  email: string,
  role_id: string,
  role: {
    id: string,
    name: string,
    archived: boolean
  },
  team_id: string,
  team: {
    id: string,
    name: string
  },
  current_contract_id: string,
  current_contract: {
    id: string,
    start_date: string,
    end_date: string,
    minutes_per_day: number,
    employment_type: string,
    rostered_days: string,
    cost_per_hour: number,
    role_id: string,
    role: {
      id: string,
      name: string,
      archived: boolean
    }
  },
  projects: {
    id: string,
    name: string,
    archived: boolean
  },
  tags: [
    string
  ],
  is_placeholder: string
}
