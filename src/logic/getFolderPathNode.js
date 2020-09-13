const getFolderPathNode = (virtualFolderPath, paths) => {
  if (virtualFolderPath.length === 0) return paths;
  
  const pathStack = virtualFolderPath.split('/');
  let currentNode = paths[pathStack[0]].paths;

  for (let depth = 1; depth < pathStack.length; depth++) {
    currentNode = currentNode[pathStack[depth]].paths;
  }

  return currentNode;
};

export default getFolderPathNode;