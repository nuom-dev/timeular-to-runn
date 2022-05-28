import axios from 'axios';
import { logger, config } from 'firebase-functions';
import { Person, Project } from './runn.models';

const apiUrl = 'https://app.runn.io/api/v0/';
const apiKey = config().runn.apikey;

export async function getRunnProjects() {
  try {
    const response = await axios.get(apiUrl + 'projects', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (err) {
    logger.error(err);
    return err.message;
  }
}

export async function getRunnRoles() {
  try {
    const response = await axios.get(apiUrl + 'roles', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (err) {
    logger.error(err);
    return err.message;
  }
}

export async function getRunnPersonByEmail(
  email: string
): Promise<Person | undefined> {
  try {
    const response = await axios.get<Person[]>(apiUrl + 'people', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data.find((person) => person.email === email);
  } catch (err) {
    logger.error(err);
    return err.message;
  }
}

export async function getSingleProject(projectId: string): Promise<Project> {
  try {
    const response = await axios.get<Project>(
      apiUrl + 'projects/' + projectId,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    logger.error(err);
    throw new Error(err.message);
  }
}

export async function addActualTimeEntry({
  date,
  personId,
  projectId,
  roleId,
  minutes,
}: {
  date: Date;
  personId: string;
  projectId: string;
  roleId: string;
  minutes: number;
}) {
  try {
    const data = {
      date: date.toISOString().split('T')[0],
      person_id: personId,
      project_id: projectId,
      role_id: roleId,
      billable_minutes: 0,
      nonbillable_minutes: 0,
    };

    const project = await getSingleProject(projectId);
    if (project.pricing_model === 'nb') {
      data['nonbillable_minutes'] = minutes;
    } else {
      data['billable_minutes'] = minutes;
    }

    logger.info({ actualData: data });
    const response = await axios.post(apiUrl + 'actuals/time_entry', data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (err) {
    logger.error(err);
    return {
      error: err.message,
    };
  }
}
