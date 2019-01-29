import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import ActionsTypes from '../../constants/actionsType';
import { webSocket } from 'rxjs/webSocket'; 
import 'rxjs/add/operator/map';

let socket$ = webSocket("ws://stocks.mnet.website");

export const fetchTicker = () => ({ type: ActionsTypes.FETCH_TICKER });
export const fetchTickerFulfilled = payload => ({ type: ActionsTypes.FETCH_TICKER_FULFILLED, payload });

// epic
export const fetchTickerEpic = action$ => action$.pipe(
    ofType(ActionsTypes.FETCH_TICKER),
    mergeMap(action =>
        socket$.map( response => fetchTickerFulfilled(response) )
    )
  );
