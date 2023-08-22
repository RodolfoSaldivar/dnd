import _ from "lodash";
import { useUsersStore } from "stores/usersStore";
import { useLoggedUserStore } from "stores/loggedUser";

export const getUsersWithoutLoggedOne = () => {
  const allUsers = useUsersStore();
  const loggedUserId = useLoggedUserStore.getState().userId;
  return _.filter(allUsers, ({ id }) => id !== loggedUserId);
};

export const convertSetToObject = theSet => {
  const pairs = [...theSet].map(item => [item, item]);
  return _.fromPairs(pairs);
};

export const isSubstringOf = (word, sentence) => {
  return sentence.toLowerCase().includes(word.toLowerCase());
};
