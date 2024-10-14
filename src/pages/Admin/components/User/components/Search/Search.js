import Button from '~/components/Button';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('search')}>
            <form>
                <label htmlFor="sort">Sort by</label>
                <select id="sort" name="sort">
                    <option value="all">All</option>
                    <option value="sortByWeight">ID</option>
                    <option value="sortByAge">Create Date</option>
                    <option value="sortByName">Number of Application</option>
                </select>

                <input type="text" placeholder="Search by name" />
                <Button primary small type="submit">
                    Search
                </Button>
            </form>
        </div>
    );
}

export default Search;
