import classNames from 'classnames/bind';
import styles from './ViewTask.module.scss';
import Button from '~/components/Button';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ViewTask({ setUndertakeTask }) {
    const data = [
        {
            id: 1,
            name: `Visit customer's house`,
            state: 'In Process',
            createDate: '20/11/2024',
            finishDate: '',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h4>
                    <b>{data[0].name}</b>
                </h4>
                <p>Application ID: #e3e3edefregregerergerge</p>
                <p>Date: 18/06/2024</p>
                <p>Adopter: Nguyen Van A</p>
                <p>Phone: 0902626226</p>
                <p>Email: furryfrienshaven@gmail.com</p>
                <p>DOB: 20/02/2004</p>
                <p>Address: FPT University</p>
                <p>City: Ho Chi Minh City</p>
                <p>Description: You will go to this address to check their house and feedback with us. Thanks you!</p>

                <div>
                    <Button
                        primary
                        medium
                        onClick={() => {
                            toast.success('Undertake Successfully!');
                            setTimeout(() => {
                                setUndertakeTask('Tasks');
                            },2000)
                        }}
                    >
                        Undertake
                    </Button>
                    <Button outline medium onClick={() => setUndertakeTask('Tasks')}>
                        Back
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ViewTask;
