import { createContext } from 'react';
import { Token } from './types';

export const UserContext = createContext<Token>({tokenContext: '', setTokenContext: () => {}});