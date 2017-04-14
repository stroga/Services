import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionLabel from 'material-ui/svg-icons/action/label';
import ActionHome from 'material-ui/svg-icons/action/home';
// import ContentInbox from 'material-ui/svg-icons/content/inbox';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';
// import ContentSend from 'material-ui/svg-icons/content/send';
//
import ActionFace from 'material-ui/svg-icons/action/face';

const iconList = {
  beauty: () => (<ActionFace />),
  repair: () => (<ActionBuild />),
  building: () => (<ActionHome />),
  hair: () => (<ActionLabel />),
  nails: () => (<ActionLabel />),
  plumber: () => (<ActionLabel />),
  electrician: () => (<ActionLabel />),
};

const listItem = (titleText, id, name) => {
  return (
    <ListItem
      key={id}
      primaryText={titleText}
      leftIcon={iconList[name]()}
      primaryTogglesNestedList={true}
      nestedItems={[]}
    />
  );
};

const iterator = (data) => {
  return (
    <ListItem
      key={data.id}
      primaryText={data.title}
      leftIcon={iconList[data.name]()}
      initiallyOpen={false}
      primaryTogglesNestedList={false}
      nestedItems={!!data.sub ? data.sub.map((el) => {
        return commonCheck(el);
      }) : [] }
    />
  );
};

function commonCheck (item) {
  const title = Object.keys(item)[0];
  if (item[title].sub.length) {
    return iterator({
      title,
      name: item[title].name,
      id: item[title].id,
      sub: item[title].sub,
      listItem: item[title],
    });
  } else {
    return listItem(title, item[title].id, item[title].name);
  }
}

/*
 * data = {
 *   name: string,
 *   id: number,
 *   title: string,
 *   sub: array,
 *   listItem: object
 * }
 *
 * */

const treeBuilder = (list, style) => {
  return (
    <div className="menuRoot">
      <List style={style}>
        {list &&
        list.map((item) => {
          return commonCheck(item);
        })
        }
      </List>
    </div>
  );
};

export default treeBuilder;