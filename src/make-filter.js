export const getFilterElement = (caption, isChecked = false) => {
  return `
		<input
			type="radio"
			id="filter-${caption.toLowerCase()}"
			name="filter"
            value="${caption.toLowerCase()}"
			${isChecked ? ` checked` : ``}
		/>
		<label for="filter-${caption.toLowerCase()}" class="trip-filter__item">
			${caption}
		</label>
	`;
};
