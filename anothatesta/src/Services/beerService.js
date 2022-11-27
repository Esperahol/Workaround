/*
Service that uses axios object above to send httpCommon requests.
The service exports CRUD functions and finder method:

    CREATE: create
    RETRIEVE: getAll, get
    UPDATE: update
    DELETE: remove, removeAll
    FINDER: findByTitle

*/

import http from "../http-common";

const getAll = () => {
  return http.get("/beer");
};

const get = id => {
  return http.get(`/beer/${id}`);
};

const create = data => {
  return http.post("/beer", data);
};

const update = (id, data) => {
  return http.put(`/beer/${id}`, data);
};

const remove = id => {
  return http.delete(`/beer/${id}`);
};

const removeAll = () => {
  return http.delete(`/beer`);
};

const findByName = name => {
  return http.get(`/beer?title=${name}`);
};

const beerService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default beerService;
