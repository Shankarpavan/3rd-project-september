import React, { useState } from "react";

export default function App() {
  const [nValue, setNValue] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const num = parseInt(nValue, 10);

    if (isNaN(num) || num < 1) {
      setResult({ error: "Please enter a valid positive integer (n ≥ 1)." });
      return;
    }

    // Mathematical formula sum
    const formulaSum = (num * (num + 1)) / 2;

    // Build the step-by-step sequence array for DOM display
    const sequence = Array.from({ length: Math.min(num, 10) }, (_, i) => i + 1);
    const isTruncated = num > 10;

    setResult({
      n: num,
      sum: formulaSum,
      sequence,
      isTruncated,
      error: null,
    });
  };

  const handleReset = () => {
    setNValue("");
    setResult(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Sum of N Natural Numbers</h1>
        <p style={styles.description}>
          Interactive DOM component calculating the sum from 1 to <i>n</i>.
        </p>

        {/* INPUT FORM */}
        <form onSubmit={handleCalculate} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="nInput" style={styles.label}>
              Enter Value (n):
            </label>
            <input
              id="nInput"
              type="number"
              min="1"
              value={nValue}
              onChange={(e) => setNValue(e.target.value)}
              placeholder="e.g. 10 or 100"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.calcBtn}>
              Calculate Sum
            </button>
            <button type="button" onClick={handleReset} style={styles.resetBtn}>
              Reset
            </button>
          </div>
        </form>

        {/* ERROR DISPLAY */}
        {result?.error && (
          <div style={styles.errorBox}>{result.error}</div>
        )}

        {/* RESULT DISPLAY */}
        {result && !result.error && (
          <div style={styles.resultContainer}>
            <div style={styles.statBox}>
              <span style={styles.statLabel}>Total Sum (S):</span>
              <span style={styles.statValue}>{result.sum.toLocaleString()}</span>
            </div>

            <div style={styles.formulaBox}>
              <strong>Formula Applied:</strong> S = n(n + 1) / 2
              <br />
              S = {result.n}({result.n} + 1) / 2 = <strong>{result.sum}</strong>
            </div>

            {/* INTERACTIVE BREAKDOWN */}
            <div style={styles.breakdownBox}>
              <p style={styles.breakdownTitle}>Sequence Breakdown:</p>
              <div style={styles.sequenceList}>
                {result.sequence.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span style={styles.numberBadge}>{item}</span>
                    {idx < result.sequence.length - 1 && <span style={styles.plus}>+</span>}
                  </React.Fragment>
                ))}
                {result.isTruncated && (
                  <>
                    <span style={styles.plus}>+ ... +</span>
                    <span style={styles.numberBadge}>{result.n}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// INLINE STYLES
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  },
  card: {
    backgroundColor: "#1e293b",
    color: "#f8fafc",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    width: "100%",
    maxWidth: "460px",
  },
  heading: {
    margin: "0 0 8px 0",
    fontSize: "1.6rem",
    textAlign: "center",
    color: "#38bdf8",
  },
  description: {
    fontSize: "0.85rem",
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#cbd5e1",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  calcBtn: {
    flex: 2,
    padding: "12px",
    backgroundColor: "#0284c7",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  resetBtn: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#475569",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  errorBox: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#7f1d1d",
    color: "#fecaca",
    borderRadius: "8px",
    fontSize: "0.85rem",
    textAlign: "center",
  },
  resultContainer: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  statBox: {
    backgroundColor: "#0f172a",
    padding: "16px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeft: "4px solid #38bdf8",
  },
  statLabel: {
    fontSize: "1rem",
    color: "#94a3b8",
  },
  statValue: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#4ade80",
  },
  formulaBox: {
    backgroundColor: "#334155",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    lineHeight: "1.5",
    color: "#e2e8f0",
  },
  breakdownBox: {
    backgroundColor: "#0f172a",
    padding: "16px",
    borderRadius: "8px",
  },
  breakdownTitle: {
    margin: "0 0 10px 0",
    fontSize: "0.85rem",
    color: "#94a3b8",
  },
  sequenceList: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "6px",
  },
  numberBadge: {
    backgroundColor: "#0284c7",
    color: "#ffffff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  plus: {
    color: "#64748b",
    fontSize: "0.8rem",
  },
};