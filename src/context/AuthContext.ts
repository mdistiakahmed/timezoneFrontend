import { createContext } from 'react';
import { Token } from './types';

export const AuthContext = createContext<Token>({tokenContext: '', setTokenContext: () => {}});