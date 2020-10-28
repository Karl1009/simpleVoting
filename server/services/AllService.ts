import Knex from 'knex';
import { tables } from './tables';
import { User } from './models';


export class UserService {
  constructor(private knex: Knex) { }

  getUserByHKID = async
}