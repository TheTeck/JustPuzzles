import tokenService from './tokenService';

const BASE_URL = '/api/puzzles';

export function create(data){
    return fetch(BASE_URL, {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function getAll() {
  return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function getOne(puzzleID) {
    return fetch(`${BASE_URL}/${puzzleID}`, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function removePUzzle(puzzleID){
    return fetch(`${BASE_URL}/${puzzleID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json())
}