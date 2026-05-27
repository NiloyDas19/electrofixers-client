import PropTypes from 'prop-types';

/**
 * Reusable page/section header with eyebrow label, heading, and optional description.
 */
const PageHeader = ({ eyebrow, heading, description, center = true }) => {
    return (
        <div className={`space-y-2 ${center ? 'text-center' : ''}`}>
            {eyebrow && (
                <p className="eyebrow">{eyebrow}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
                {heading}
            </h2>
            {description && (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                    {description}
                </p>
            )}
        </div>
    );
};

PageHeader.propTypes = {
    eyebrow:     PropTypes.string,
    heading:     PropTypes.node.isRequired,
    description: PropTypes.string,
    center:      PropTypes.bool,
};

export default PageHeader;
