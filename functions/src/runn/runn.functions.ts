import {regionalFunctions} from "../utils/functions.utils";
import {getRunnPersonByEmail, getRunnProjects} from "./runn.utils";

export const getProjects = regionalFunctions.https
  .onCall(async (data, context) => {
    return getRunnProjects();
  })

export const getUser = regionalFunctions.https.onCall(async (data: {email: string}, context) => {
  return getRunnPersonByEmail(data.email);
})
