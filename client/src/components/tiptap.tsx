import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";

type TipTapProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const TipTap = ({ email, setEmail }: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: email,
    editorProps: {
      attributes: {
        class: "p-2 rounded-md border min-h-[150px] border-input",
      },
    },
    onUpdate({ editor }) {
      setEmail(editor.getHTML());
    },
  });
  return (
    <div className=" flex flex-col min-h-[250x] mt-5 gap-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
