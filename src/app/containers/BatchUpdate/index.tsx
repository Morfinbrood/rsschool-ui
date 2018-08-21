import { assignMentors, fetchAllCourses } from 'core/actions';
import { ICourse } from 'core/models';
import { RootState } from 'core/reducers';
import { classNames } from 'core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';

const cn = classNames(require('./index.scss'));

const mapStateToProps = (state: RootState, props: any): Props => {
    return {
        ...props,
        courses: state.courses.data,
    };
};

const mapDispatchToProps = (dispatch: any, props: Props): Props => {
    return {
        ...props,
        fetchCourses: () => {
            dispatch(fetchAllCourses());
        },
        assignMentors: (courseId: string) => {
            dispatch(assignMentors(courseId));
        },
    };
};

type Props = {
    courses: ICourse[];
    fetchCourses: () => void;
    assignMentors: (courseId: string) => void;
};

class BatchUpdate extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchCourses();
    }

    render() {
        return (
            <div className="row">
                {this.props.courses.map(course => (
                    <div className="col-sm-6 mb-4" key={course._id}>
                        <Card color="secondary">
                            <CardHeader>
                                <h4>{course.name}</h4>
                            </CardHeader>
                            <CardBody>
                                <div className="row">
                                    <a
                                        className={cn('btn btn-info', 'action-button')}
                                        href={`/batchUpdate/${course._id}/import`}
                                    >
                                        import
                                    </a>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BatchUpdate);
