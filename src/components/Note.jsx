import { useState } from "react";

function Note({ id, title, content, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    if (updatedTitle.trim() === "" || updatedContent.trim() === "") {
      alert("Title and content cannot be empty!");
      return;
    }
    onUpdate(id, { title: updatedTitle, content: updatedContent });
    setIsEditing(false);
  }

  function handleCancel() {
    setUpdatedTitle(title);
    setUpdatedContent(content);
    setIsEditing(false);
  }

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <button onClick={handleSave}>✅ Save</button>
          <button onClick={handleCancel}>❌ Cancel</button>
        </>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
          <button onClick={handleEdit}>✏️ Edit</button>
          <button onClick={() => onDelete(id)}>🗑️ Delete</button>
        </>
      )}
    </div>
  );
}

export default Note;
