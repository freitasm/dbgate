import _ from 'lodash';
import { GridDisplay, ChangeCacheFunc, ChangeConfigFunc } from './GridDisplay';
import { EngineDriver, ViewInfo, ColumnInfo, CollectionInfo } from 'dbgate-types';
import { GridConfig, GridCache } from './GridConfig';

export class CollectionGridDisplay extends GridDisplay {
  constructor(
    public collection: CollectionInfo,
    driver: EngineDriver,
    config: GridConfig,
    setConfig: ChangeConfigFunc,
    cache: GridCache,
    setCache: ChangeCacheFunc
  ) {
    super(config, setConfig, cache, setCache, driver);
    this.columns = []; 
    this.filterable = true;
    this.sortable = true;
    this.editable = false;
    this.supportsReload = true;
  }

  // getDisplayColumns(view: ViewInfo) {
  //   return (
  //     view?.columns
  //       ?.map(col => this.getDisplayColumn(view, col))
  //       ?.map(col => ({
  //         ...col,
  //         isChecked: this.isColumnChecked(col),
  //       })) || []
  //   );
  // }

  // getDisplayColumn(view: ViewInfo, col: ColumnInfo) {
  //   const uniquePath = [col.columnName];
  //   const uniqueName = uniquePath.join('.');
  //   return {
  //     ...col,
  //     pureName: view.pureName,
  //     schemaName: view.schemaName,
  //     headerText: col.columnName,
  //     uniqueName,
  //     uniquePath,
  //   };
  // }
}
