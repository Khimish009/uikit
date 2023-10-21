import { useState } from "react";
import { TagsInput } from "./TagsInput";
import "./styles.css";

export default function App() {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div>
      <TagsInput tags={tags} onChange={setTags} />
    </div>
  );
}
