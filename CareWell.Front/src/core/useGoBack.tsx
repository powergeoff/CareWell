import { Location } from 'history';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useGoBack = () => {    
  const history = useHistory();  
  return useCallback(() => {
    const state = history?.location?.state as { from?: Location };
    if (state?.from != null) history.push(state.from);
    else history.goBack();
  }, [history]);
};
