/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @oncall react_native
 */

import {EventEmitter} from 'events';
import {ConfigT} from 'metro-config';
import {ResolverInputOptions} from '../shared/types';
import {
  BundlerResolution,
  TransformResultDependency,
} from '../DeltaBundler/types';

export default class DependencyGraph extends EventEmitter {
  constructor(
    config: ConfigT,
    options?: Readonly<{
      hasReducedPerformance?: boolean;
      watch?: boolean;
    }>,
  );

  ready(): Promise<void>;

  /** @deprecated Use the constructor + `ready()` directly */
  load(
    config: ConfigT,
    options?: Readonly<{hasReducedPerformance?: boolean; watch?: boolean}>,
  ): Promise<DependencyGraph>;

  getAllFiles(): string[];
  getSha1(filename: string): string;
  getWatcher(): EventEmitter;
  end(): void;

  /** Given a search context, return a list of file paths matching the query. */
  matchFilesWithContext(
    from: string,
    context: Readonly<{
      /* Should search for files recursively. */
      recursive: boolean;
      /* Filter relative paths against a pattern. */
      filter: RegExp;
    }>,
  ): string[];

  resolveDependency(
    from: string,
    to: TransformResultDependency,
    platform: string | null,
    resolverOptions: ResolverInputOptions,
    options: {assumeFlatNodeModules: boolean},
  ): BundlerResolution;

  getHasteName(filePath: string): string;
  getDependencies(filePath: string): string[];
}
