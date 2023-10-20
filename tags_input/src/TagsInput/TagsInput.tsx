import { ChangeEvent, KeyboardEvent, useState } from "react";
import './TagsInput.scss'

interface TagsInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
}

export const TagsInput = ({ tags, onChange }: TagsInputProps) => {
    const [value, setValue] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const isEnter = e.code === 'Enter'
        const value = e.currentTarget.value

        if (value.length === 0 || !isEnter) return

        setValue('')
        onChange([...tags, value])
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!value.includes(",")) {
            setValue(value);
            return;
        }

        const values = value.split(",");
        const lastValue = values.pop();

        setValue(lastValue || "");

        if (values.length === 0) return;

        onChange([...tags, ...values]);
    };

    const handleDelete = (tagToDelete: string) => {
        onChange(tags.filter((tag) => tag !== tagToDelete));
    };

    return (
        <div className="tags-input">
            {tags.map((tag) => (
                <div
                    data-testid="tag"
                    key={tag}
                    style={{
                        padding: "3px 8px",
                        backgroundColor: "lightgrey",
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    {tag}
                    <div
                        style={{
                            height: "100%",
                            marginLeft: 4,
                            cursor: "pointer"
                        }}
                        onClick={() => handleDelete(tag)}
                        data-testid="tag-delete"
                    >
                        x
                    </div>
                </div>
            ))}
            <input
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{
                    border: "none",
                    outline: "none",
                    flexBasis: "120px"
                }}
                type="text"
                data-testid="tags-input"
            />
        </div>
    );
};
