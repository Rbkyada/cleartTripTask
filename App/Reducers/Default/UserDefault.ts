import { NotesList } from '@Utils/Interface';

export interface UserDefault {
  user: any;
  notesList: NotesList[];
}
const userDefault: UserDefault = {
  user: {},
  notesList: [],
};

export default userDefault;
