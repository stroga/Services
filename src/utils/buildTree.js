import React from 'react';
import { List, ListItem } from 'material-ui/List';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import ContentInbox from 'material-ui/svg-icons/content/inbox';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';
// import ContentSend from 'material-ui/svg-icons/content/send';
//
import ActionFace from 'material-ui/svg-icons/action/face';

const iconList = {
  beauty: () => (<ActionFace />),
  repair: () => (<ActionFace />),
  building: () => (<ActionFace />),
  hair: () => (<ActionFace />),
  nails: () => (<ActionFace />),
  plumber: () => (<ActionFace />),
  electrician: () => (<ActionFace />),
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

/*
* [listItem(title, item[title].id, item[title].name)]
* */

const iterator = (data) => {
  let iterable = data.sub || [{
      title: data.title,
      name: data.listItem.name,
      id: data.listItem.id,
      sub: data.sub
    }];

  return iterable.map((item) => {
    const title = Object.keys(item)[0];
    return (
      <ListItem
        key={item[title].id}
        primaryText={title}
        leftIcon={iconList[item[title]['name']]()}
        initiallyOpen={false}
        primaryTogglesNestedList={false}
        nestedItems={!!item[title].sub ? iterator({
          title,
          name: item[title].name,
          id: item[title].id,
          sub: item[title].sub,
          listItem: item[title]
        }) : [listItem(data.title, data.id, data.name)]}
      />
    );
  });
};



const treeBuilder = (list, style) => {
  return (
    <div className="menuRoot">
      <List style={style}>
        {list &&
          list.map((item) => {
            const title = Object.keys(item)[0];
            return iterator({
              title,
              name: item[title].name,
              id: item[title].id,
              sub: item[title].sub,
              listItem: item[title]
            });
          })
        }
      </List>
    </div>
  );
};

export default treeBuilder;