const createActionTypes = (name: string) => {
  return {
    CREATE: `${name}_CREATE`,
    EDIT: `${name}_EDIT`,
    DELETE: `${name}_DELETE`,
  };
};

export const FILE = createActionTypes("FILE");
export const FOLDER = createActionTypes("FOLDER");
