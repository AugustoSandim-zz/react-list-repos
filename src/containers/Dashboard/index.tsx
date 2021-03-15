import { List } from 'immutable';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import debounce from 'utils/debounce';
import { fetchReposRequest, getIsLoadingRepos, getReposCount, getReposData, getReposError, Repository } from '../../store/reducers/repositories';
import { ApplicationState } from '../../store/rootReducer';
import styles from './Dashboard.module.scss';

interface StateProps {
  fetchReposRequest: typeof fetchReposRequest;
  reposError: boolean;
  reposCount: number;
  isLoadingRepos: boolean;
  reposData: List<Repository>;
}

type Props = RouteComponentProps & StateProps;

const Dashboard: React.FC<Props> = ({
  fetchReposRequest,
  reposData,
  isLoadingRepos
}) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event: any) => {
    const inputValue = event.target.value || '';
    setSearchText(inputValue);

    debounce((search: string) => {
      fetchReposRequest({ username: search })
    }, 600)(inputValue);

  };

  if (isLoadingRepos) return <>Carregando</>

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Dashboard</h1>
        <label htmlFor="search">Digite o nome do usuário</label>
        <input id="search" placeholder="Digite o nome do usuário" value={searchText} onChange={handleSearchChange} />
        <ul>
          {reposData && reposData.map((item: any) => (
            <div key={item.get('id')}>
              <hr />
              <div>{item.get('id')}</div>
              <div>{item.get('name')}</div>
              <div>{item.get('description')}</div>
              <div>{item.get('created_at')}</div>
              <div>{item.get('language')}</div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default connect(
  (state: ApplicationState) => ({
    reposData: getReposData(state),
    reposError: getReposError(state),
    isLoadingRepos: getIsLoadingRepos(state),
    reposCount: getReposCount(state),
  }),
  {
    fetchReposRequest,
  },
)(Dashboard);
