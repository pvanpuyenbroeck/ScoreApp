import React from 'react';
import classes from './Tabs.css';
import Tab from './Tab/Tab';

const tabs = (props) => {
    const tabs = props.tabs.map(tab => {
        return (
            <Tab
                title={tab.title}
                selected={tab.selected}
                tabClicked={() => props.tabClicked(tab.title)}
            />
        )
    })
    return (
        <div className={classes.Tabs}>
            {tabs}
        </div>
    )
}

export default tabs;

