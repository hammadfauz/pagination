'use strict';
import React from 'react';
import palette from './palette';

const styles = {
    main : {
        font: "16px/32px 'Lato', sans-serif",
        color: palette.grey,
        textAlign: "center",
        margin: "20px auto"
    },
    leftArrow: {
        padding: "0 30px 0 0",
        cursor: "pointer"
    },
    rightArrow: {
        padding: "0 0 0 30px",
        cursor: "pointer"
    },
    page: {
        padding: "0 20px",
        cursor: "pointer"
    },
    pageCurrent: {
        padding: "0 20px",
        cursor: "default",
        fontWeight: "bold",
        color: palette.black,
    }
};

class Pagination extends React.Component{
    render () {
        const self = this;
        const spanMaxLength = 10;
        const firstPage = 1;
        const lastPage = self.props.totalPages;
        const rendered = [];

        if (firstPage<=lastPage) {
            const currentPage = self.props.currentPage>=lastPage ? lastPage : (self.props.currentPage<=firstPage ? firstPage : self.props.currentPage);
            const prevPage = Math.max(currentPage-1, firstPage);
            const nextPage = Math.min(currentPage+1, lastPage);

            let spanStart = firstPage;
            let spanEnd = lastPage;
            if ((spanEnd-spanStart+1)<(spanMaxLength*1.5)) {
                // Whole span range is too small, do not modify span borders
            }
            else if (currentPage>=spanStart && currentPage<=(spanStart+spanMaxLength-1-1)) {
                // Current page is within the beginning span
                spanEnd = spanStart+spanMaxLength-1;
            }
            else if (currentPage<=spanEnd && currentPage>=(spanEnd-spanMaxLength+1+1)) {
                // Current page is within the ending span
                spanStart = spanEnd-spanMaxLength+1;
            }
            else {
                // Current page is somewhere in between
                spanStart = Math.round(currentPage-spanMaxLength/2);
                spanEnd = spanStart+spanMaxLength-1;
            }
            if (spanStart<=firstPage) spanStart=firstPage;
            if (spanEnd>=lastPage) spanEnd=lastPage;

            rendered.push(<span key="page-la" style={styles.leftArrow} onClick={()=>self.props.onPageSelect(prevPage)}>&lt;</span>);
            if (spanStart!=firstPage) rendered.push(<span key={"page-"+firstPage} style={styles.page} onClick={()=>self.props.onPageSelect(firstPage)}> {firstPage}</span>);
            for (let i=spanStart; i<=spanEnd; i++) {
                const iPage = i;
                rendered.push(<span key={"page-"+iPage} style={iPage===currentPage ? styles.pageCurrent : styles.page} onClick={()=>self.props.onPageSelect(iPage)}> {iPage}</span>);
            }
            if (spanEnd!=lastPage) rendered.push(<span key={"page-"+lastPage} style={styles.page} onClick={()=>self.props.onPageSelect(lastPage)}> {lastPage}</span>);
            rendered.push(<span key="page-ra" style={styles.rightArrow} onClick={()=>self.props.onPageSelect(nextPage)}>&gt;</span>);
        }

        return <div style={styles.main}>{rendered}</div>;
    }
};

module.exports = Pagination;
