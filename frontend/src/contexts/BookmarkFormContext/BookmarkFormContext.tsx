import { createContext } from "react";

const BookmarkFormContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | null
>(null);

export default BookmarkFormContext;
