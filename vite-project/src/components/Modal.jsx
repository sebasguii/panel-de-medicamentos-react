export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(44, 62, 80, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(5px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: "20px 25px",
          maxWidth: "95%",
          width: "1000px",
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
          border: "3px solid #16a085",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
            paddingBottom: 12,
            borderBottom: "2px solid #ecf0f1",
          }}
        >
          <h2 style={{ margin: 0, color: "#2c3e50", fontSize: "1.5rem", fontWeight: 700 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: "#e74c3c",
              border: "2px solid #e74c3c",
              fontSize: 18,
              cursor: "pointer",
              color: "#fff",
              padding: 0,
              width: 32,
              height: 32,
              borderRadius: 4,
              fontWeight: 700,
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(231, 76, 60, 0.3)",
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
