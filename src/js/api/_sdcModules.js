export const moduleInventory = [];

export function subscribe(name, methodConfigs) {
  if (!name || typeof name !== 'string') {
    throw Error('Invalid name parameter');
  }

  if (!methodConfigs || typeof methodConfigs !== 'object' || !methodConfigs.length) {
    throw Error('Invalid methodConfigs parameter');
  }

  const existing = moduleInventory.find(mod => mod.name === name);
  const moduleConfig = existing ||
    createModuleConfig({
      name,
      methodConfigs
    });

  if (existing && moduleConfig.notLoaded) {
    existing.notLoaded = false;
  } else if (existing && !moduleConfig.notLoaded) {
    throw Error('Module ' + name + ' already exists');
  }

  addModuleMethods(moduleConfig, methodConfigs);
  moduleInventory.push(moduleConfig);
}

function createModuleConfig(opts) {
  if (!opts.name) {
    throw Error('createModuleEntry: Module \'name\' not found in opts: ', opts);
  }

  return {
    name: opts.name,
    mod: {},
    autoRun: [],
    notLoaded: !!opts.notLoaded,
    methodConfigs: [],
    replaced: [/* 'methodName' */]
  };
}

function addModuleMethods(moduleConfig, methodConfigs) {
  methodConfigs.forEach((config) => {
    moduleConfig.mod[config.methodName] = config.method;

    if (config.boot) {
      moduleConfig.autoRun.push(moduleConfig.mod[config.methodName]);
    }
  });

  moduleConfig.methodConfigs = methodConfigs;
}

export function get(name) {
  const found = moduleInventory.find(mod => mod.name === name);

  if (!found) {
    /**
     * Augment empty module
     */
    const moduleConfig = createModuleConfig({name, notLoaded: true});
    moduleInventory.push(moduleConfig);

    return moduleConfig.mod;
  }

  return found.mod;
}

/**
 * Override methods - testing
 */
export function replace(name, methodName, method) {
  const moduleConfig = moduleInventory.find(mod => mod.name === name);

  if (!moduleConfig) {
    throw Error('Module ' + name + ' not found to replace method');
  }

  if (!moduleConfig.mod[methodName]) {
    throw Error('Method name ' + methodName + ' not found and cannot be replaced');
  }

  moduleConfig.mod[methodName] = method;
  moduleConfig.replaced.push(methodName);

  return moduleConfig.mod;
}

/**
 * Reset modules to use methods that were initially defined - testing
 */
export function reset() {
  moduleInventory.forEach(moduleConfig => {
    moduleConfig.replaced.forEach(methodName => {
      moduleConfig.mod[methodName] = moduleConfig.methodConfigs
        .find(config => config.methodName === methodName).method;
    });
  });
}

export function noop() {}

export function getAllToRun() {
  let autoRunItems = [];

  moduleInventory.forEach((item) => {
    autoRunItems = autoRunItems.concat(item.autoRun);
  });

  return autoRunItems;
}
