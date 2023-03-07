import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import resume from "./resume.md";

export default function App()  {

    const [resumeText, setResumeText] = useState("");

    useEffect(() => {
        fetch(resume)
            .then((response) => response.text())
            .then((text) => setResumeText(text));
    }, []);

    return (
        <div>
            <ReactMarkdown
                children={resumeText}
                remarkPlugins={[remarkGfm]}
            />
        </div>
    )
}
