import { Repository } from '../../../graphql/types';
import BigNumber from "bignumber.js";

type RepoResultsProps = {
  repositoryCount: number;
  results: Repository[];
  isLoading: boolean;
};

export function RepoResults({ results, repositoryCount, isLoading }: RepoResultsProps) {
  return (
    isLoading ? <p style={{ color: "#fff", paddingLeft: "1rem" }}>Loading...</p>
      : <>
        <p style={{ color: "#fff", paddingLeft: "1rem" }}>
          {repositoryCount > 0
            ? `${new BigNumber(repositoryCount).toFormat()} repositories`
            : 'No repositories'}</p>
        {results.map((result, index) => (
          <div className="search-results-item-repo" key={index}>
            <div>
              <a className="search-results-item-link" href={result.url}>
                {result.name}
              </a>
              <div className="search-results-repo-description">
                {result.description}
              </div>
            </div>
          </div>
        ))}
      </>
  );
}
