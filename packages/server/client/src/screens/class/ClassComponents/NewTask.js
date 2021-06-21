import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiOutlinePlus } from 'react-icons/ai';
import posSorting from '../../../common/utility-functions';
import * as actions from '../../../actions';
import { PopoverForm } from '../../../components';
import { taskSchema } from './structure';

class NewTask extends Component {
    state = { popOpen: false };

    handlePopOverForm = () => {
        const { popOpen } = this.state;
        this.setState({ popOpen: !popOpen });
    }

    addNewTask = async (data) => {
        const { columnId, account, boardId, database, addDatabaseSchema, api } = this.props;
        const sortedTasks = Object.values(database.BoardColumnCard.byId).filter(o => !o.deleteStatus && o.boardColumnId === columnId).sort(posSorting);
        const pos = sortedTasks.length > 0 ? sortedTasks[sortedTasks.length - 1].position + 16384 : 16384;
        const obj = {
            ...data,
            userId: account.user.id,
            timeStamp: Date.now(),
            position: pos,
            boardColumnId: columnId,
            broadCastId: `Board-${boardId}`,
        }
        const res = await api.addBoardColumnCard(obj);
        if (res) {
            addDatabaseSchema('BoardColumnCard', { ...obj, id: res });
            this.handlePopOverForm();
            return { response: 200 };
        }
        return { response: 404 };
    };

    render() {
        const { popOpen } = this.state;
        const schema = taskSchema();
        return (
            <div>
                <PopoverForm
                    isOpen={popOpen}
                    onClose={this.handlePopOverForm}
                    callback={this.addNewTask}
                    structure={schema}
                />
                <div className="column-footer" role="button" tabIndex={0} onKeyDown={this.handlePopOverForm} onClick={this.handlePopOverForm}>
                    <AiOutlinePlus />
                    New Task
                </div>
            </div>
        );
    }
}

NewTask.propTypes = {
    columnId: PropTypes.number.isRequired,
    account: PropTypes.objectOf(PropTypes.any).isRequired,
    api: PropTypes.objectOf(PropTypes.any).isRequired,
    database: PropTypes.objectOf(PropTypes.any).isRequired,
    boardId: PropTypes.number.isRequired,
    addDatabaseSchema: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
export default connect(mapStateToProps, { ...actions })(NewTask);
