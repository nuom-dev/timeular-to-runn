import {User} from "./user.model";
import {getRunnPersonByEmail} from "../runn/runn.utils";

export async function createNewUser(email: string): Promise<User> {
  const person = await getRunnPersonByEmail(email);
  return {
    email,
    runn: {
      personId: person?.id ?? '',
    }
  }
}
