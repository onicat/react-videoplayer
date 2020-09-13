const getFolderPathNode = (folderPath, paths) => {
  if (folderPath.length === 0) return paths;
  
  const pathStack = folderPath.split('/');
  let currentNode = paths[pathStack[0]];

  for (let depth = 1; depth < pathStack.length; depth++) {
    currentNode = currentNode.paths[pathStack[depth]];
  }

  return currentNode;
};

export default getFolderPathNode;