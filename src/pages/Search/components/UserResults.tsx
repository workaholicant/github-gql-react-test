import { User } from '../../../graphql/types';
import BigNumber from "bignumber.js";

type UserResultsProps = {
  userCount: number;
  results: User[];
  isLoading: boolean;
};

export function UserResults({ results, userCount, isLoading }: UserResultsProps) {
  const generateLink = (user: User) => (`https://github.com/${user?.login}`)
  return (
    isLoading ? <p style={{ color: "#fff", paddingLeft: "1rem" }}>Loading...</p>
      : <>
        <p style={{ color: "#fff", paddingLeft: "1rem" }}>
          {userCount > 0
            ? `${new BigNumber(userCount).toFormat()} users`
            : 'No user'}</p>
        {results.map((result, index) => (
          <div key={`${index}`} className="search-results-item-repo">
            <div>
              <a href={generateLink(result)}>
                <img src={result.avatarUrl} alt="avatar" className="avatar" />
              </a>
            </div>
            <div>
              <div style={{ flexDirection: 'row', display: 'flex' }}>
                {result.name && result?.name?.length > 0 && <a className="search-results-item-link" href={generateLink(result)}>
                  {result.name}
                </a>}
                <a className='search-results-item-username' style={{ marginLeft: result?.name?.length > 0 ? '0.5rem' : '0'}} href={generateLink(result)}>
                  @{result.login}
                </a>
              </div>
              <div className="search-results-item-description">
                {result.bio}
              </div>
            </div>
          </div>
        ))}
      </>
  );
}
