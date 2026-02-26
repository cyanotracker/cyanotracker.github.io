import React, { useState, useEffect } from "react";
import "./index.css";

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const GitRepoCard = ({ repo }) => {
  const {
    name,
    description,
    html_url,
    language,
    stargazers_count,
    forks_count,
    pushed_at,
    updated_at,
    has_pages,
    fork,
  } = repo;

  const [languages, setLanguages] = useState([]);
  
  useEffect(() => {
    if (!repo.languages_url) return;
  
    fetch(repo.languages_url)
      .then((res) => res.json())
      .then((data) => {
        const langList = Object.keys(data);
        setLanguages(langList);
      })
      .catch(() => setLanguages([]));
  }, [repo.languages_url]);
  
  return (
    <div className="git-card">
      <div className="git-card-top">
        <h3 className="git-title">{name}</h3>

        <div className="git-badges">
          {languages.map((lang) => (
            <span key={lang} className="git-badge">
              {lang}
            </span>
            ))}
        </div>
      </div>

      {description && <p className="git-desc">{description}</p>}

      <div className="git-meta">
        <span>⭐ {stargazers_count ?? 0}</span>
        <span>🍴 {forks_count ?? 0}</span>
        <span className="git-date">Updated: {formatDate(pushed_at || updated_at)}</span>
      </div>

      <div className="git-actions">
        <a className="git-btn" href={html_url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default GitRepoCard;
