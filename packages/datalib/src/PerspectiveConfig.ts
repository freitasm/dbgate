import { DatabaseInfo, ForeignKeyInfo, NamedObjectInfo } from 'dbgate-types';

export interface PerspectiveConfigColumns {
  expandedColumns: string[];
  checkedColumns: string[];
  uncheckedColumns: string[];
}

export interface PerspectiveCustomJoinConfig {
  joinid: string;
  joinName: string;
  baseUniqueName: string;
  conid?: string;
  database?: string;
  refSchemaName?: string;
  refTableName: string;
  columns: {
    baseColumnName: string;
    refColumnName: string;
  }[];
}

export interface PerspectiveFilterColumnInfo {
  columnName: string;
  filterType: string;
  pureName: string;
  schemaName: string;
  foreignKey: ForeignKeyInfo;
}

export interface PerspectiveParentFilterConfig {
  uniqueName: string;
}
export interface PerspectiveConfig extends PerspectiveConfigColumns {
  rootObject: { schemaName?: string; pureName: string };
  filters: { [uniqueName: string]: string };
  sort: {
    [parentUniqueName: string]: {
      uniqueName: string;
      order: 'ASC' | 'DESC';
    }[];
  };
  customJoins: PerspectiveCustomJoinConfig[];
  parentFilters: PerspectiveParentFilterConfig[];
}

export function createPerspectiveConfig(rootObject: { schemaName?: string; pureName: string }): PerspectiveConfig {
  return {
    expandedColumns: [],
    checkedColumns: [],
    uncheckedColumns: [],
    customJoins: [],
    filters: {},
    sort: {},
    rootObject,
    parentFilters: [],
  };
}

export type ChangePerspectiveConfigFunc = (
  changeFunc: (config: PerspectiveConfig) => PerspectiveConfig,
  reload?: boolean
) => void;

export function extractPerspectiveDatabases(
  { conid, database },
  cfg: PerspectiveConfig
): { conid: string; database: string }[] {
  const res: { conid: string; database: string }[] = [];
  res.push({ conid, database });

  function add(conid, database) {
    if (res.find(x => x.conid == conid && x.database == database)) return;
    res.push({ conid, database });
  }

  for (const custom of cfg.customJoins) {
    add(custom.conid || conid, custom.database || database);
  }
  return res;
}

export interface MultipleDatabaseInfo {
  [conid: string]: {
    [database: string]: DatabaseInfo;
  };
}
