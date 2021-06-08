import { all } from 'redux-saga/effects';


import conceptsSaga from '../components/with-concepts/redux/saga';


export default function* saga() {
  yield all([
    conceptsSaga(),
  ]);
}
