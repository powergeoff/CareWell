import { mergeStyleSets } from '@fluentui/react';
import React, { useMemo } from 'react';

import { Button } from './button';

const classes = mergeStyleSets({
  pagination: {
    listStyleType: 'none',
    paddingInlineStart: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
  },
  ellipsis: { fontWeight: '600', fontSize: '1.5rem', paddingRight: '0.5rem' },
  pageButton: { marginRight: '0.5rem' },
});

interface Props {
  currentPage: number;
  totalPages: number;
  setPage: (value: number) => void;
}

export const Paginator = ({ currentPage, totalPages, setPage }: Props) => {
  const delta = 2;

  const pages = useMemo(() => {
    const list = [{ number: 1, skip: false }];
    const start = Math.max(currentPage - delta, 2);
    const end = Math.min(currentPage + delta, totalPages);
    if (start - 1 > 1) list.push({ number: start - 1, skip: true });
    for (let i = start; i <= end; i++) list.push({ number: i, skip: false });
    if (totalPages - end > 0) {
      if (totalPages - end > 1) list.push({ number: totalPages - 1, skip: true });
      list.push({ number: totalPages, skip: false });
    }
    return list;
  }, [currentPage, totalPages]);

  const links = pages.map((p) => {
    if (p.skip) {
      return (
        <div key={p.number}>
          <li>
            <span className={classes.ellipsis}>&hellip;</span>
          </li>
        </div>
      );
    }
    return (
      <li key={p.number}>
        <Button
          variant={currentPage === p.number ? 'primary' : 'default'}
          className={classes.pageButton}
          onClick={() => setPage(p.number)}>
          {p.number}
        </Button>
      </li>
    );
  });

  return <ul className={classes.pagination}>{links}</ul>;
};
