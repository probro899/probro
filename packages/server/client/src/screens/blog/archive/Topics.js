import React, { useState } from 'react';
import _ from 'lodash';
import { FormTextInput } from '../../../common/Form/FormTextInput';
import { FiSearch } from 'react-icons/fi';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import FilterIconWithCount from './FilterIconWithCount';

const allTopics = [
    { id: 'python', name: 'Python' },
    { id: 'html', name: 'HTML' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'react', name: 'React' },
    { id: 'django', name: 'Django' },
];

const Topics = ({ selectedTopics, setSelectedTopics }) => {
  const [searchKey, setSearchKey] = useState('');
  const [topicsList, setTopicList] = useState([ ...allTopics ]);

  const handleSelectedTopic = (id) => {
    if (selectedTopics.includes(id)) {
      setSelectedTopics(selectedTopics.filter(o => o !== id));
    } else {
      setSelectedTopics([...selectedTopics, id]);
    }
  }

  const performSearch = _.debounce((key) => {
    const searchKey = key.toLowerCase();
    const newList = allTopics.filter(item => item.name.toLowerCase().indexOf(searchKey) >= 0);
    setTopicList(newList);
  }, 1000)

  const onkeyChange = (val) => {
    setSearchKey(val);
    performSearch(val);
  }

  const getTopicItem = (name, id) => {
    const sel = selectedTopics.includes(id);
    return (
      <li
        key={`topic-${id}`}
        className={`topic-list__item ${sel && 'topic-list__item--active'}`}
        onClick={() => handleSelectedTopic(id)}
      >
        <p>{name}</p>
        {sel && <div className="cross-icon"><IoMdCloseCircleOutline size={20} /></div>}
      </li>
    )
  }

  return (
    <div className="topics">
      <div className="topics__header">
        <h3>Topics</h3>
        <FilterIconWithCount count={selectedTopics.length} />
      </div>
      <div className="topics__filter">
        <FormTextInput
          onChange={(e) => onkeyChange(e.target.value)}
          name="filter"
          value={searchKey}
          placeholder="Search topic"
          leftElement={<FiSearch size={20} />}
        />
      </div>
      <div className="topics__body">
        <ul className="topic-list">
          {topicsList && topicsList.map(({ id, name }) => (getTopicItem(name, id)))}
        </ul>
      </div>
    </div>
  )
}

export default Topics;
